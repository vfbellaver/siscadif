/**
 * Created by Vagner Bellaver on 25/03/2017.
 */

angular.module("siscadifapp").controller("cursoController",function ($scope, cursoAPIService,$location) {

    // variaveis scope
    $scope.listaDeCursos=[];
    $scope.pagina =1;

//-----------------------FUNCAO QUE SALVA CURSO--------------------------------------------------//
    //ACESSA O CURSO API SERVICE E PASSA O JSON CURSO PARA A FUNCAO SALVARCURSO(LINHA14) DO SERVICE
    $scope.salvarCurso = function (curso) {
        cursoAPIService.salvarCurso(curso).then(function (dados) {
            alert("Curso salvo com sucesso");
            $location.url("/listarCursos")
        },function (err) {
            alert("Deu erro");
        });
    }

//----------------------------FUNCAO QUE LISTA TODOS OS CURSOS------------------------------------------//
    // ACESSA O CURSO API SERVICE E GUARDA NO ARRAY listaDeCursos O ARRAY QUE VEM DA FUNCAO LISTARCURSOS DO SERVICE
    var listarCursos = function () {
        var sucesso = function (dados) {
            $scope.listaDeCursos = dados.data;
        };
        var erro = function (err) {
            alert("Erro"+err)
        };

        cursoAPIService.listarCursos().then(sucesso,erro);
     };


//-----------------------------------------------------------------------------------//
    // PASSA A PAGINA ACESSANDO UMA FUNCAO QUE LISTA CURSOS POR PAGINAS DO CURSOAPISERVICE (LINHA 40)
        $scope.PassarPag = function (pagina) {
            $scope.pagina = pagina+1;
            cursoAPIService.listarCursosPorPagina($scope.pagina).then(function (dados) {
               if(!dados.data.length == 0){
                   $scope.listaDeCursos = dados.data;
               }else{
                   $scope.pagina--;
               }
            },function (err) {
                alert("Deu erro"+err);
            });
        };
    // VOLTA A PAGINA ACESSANDO UMA FUNCAO QUE LISTA CURSOS POR PAGINAS DO CURSOAPISERVICE (LINHA 56)
        $scope.VoltarPag = function (pagina) {
            $scope.pagina = pagina-1;
            if($scope.pagina == 0){
                $scope.pagina = 1;
            }
            cursoAPIService.listarCursosPorPagina($scope.pagina).then(function (dados) {
                if(!dados.data.length == 0){
                    $scope.listaDeCursos = dados.data;
                }
            },function (err) {
                alert("Deu erro"+err);
            });
        };

//-----------------------------------------------------------------------------------//
        listarCursos();
});