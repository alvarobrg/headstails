// funções que ficavam no index.html

// fnAtualizaConteudo = function (pagina) {
//   $("li.active ripple").removeClass("active");
//   $(this).toggleClass("active");
// };

// fnAnima = function (nomeTela) {
//   $("#headerPrincipal").css("display", "block");
//   $("#principal").css("display", "block");
//   $("#headerPrincipal").css("display", "block");
// };

function fnExportaExcel(grid) {
  var dataSource = grid.data("kendoGrid").dataSource;
  totalAnt = dataSource.pageSize();
  total = dataSource.total();
  dataSource.pageSize(total);
  grid.getKendoGrid().saveAsExcel();
  dataSource.pageSize(totalAnt);
}
