/**
 * Created by Vagner Bellaver on 27/03/2017.
 */
angular.module("siscadifapp").controller("disciplinaController",function ($scope,disciplinaAPIService,cursoAPIService,$location) {
    //VARIAVEIS SCOPE
    $scope.listaDeCursos=[];
    $scope.listaDeCursosSelect=[];
    $scope.listaDeDisciplinas=[];
    $scope.listaDeDisciplinas={};
    $scope.pagina =1;
//-----------------------------------------------------------------------------------//
    //SALVA O JSON DISCIPLINA NO HTML NO SERVICE ATRAVES DA FUNCAO SALVARDISCIPLINA DO DISCIPLINAAPISERVICE(LINHA14)
        $scope.salvarDisciplina = function (disciplina) {
            disciplinaAPIService.salvarDisciplina(disciplina).then(function (dados) {
                alert("Disciplina salva com sucesso");
                $location.url("/listarDisciplinas")
            },function (err) {
                alert("Deu erro");
            });
        }

//-----------------------------------------------------------------------------------//
    // GUARDA NO ARRAY listaDeCursos O ARRAY QUE VEM DO SERVICE ATRAVES DA FUNCAO
    // LISTARCURSOS DO CURSOAPISERVICE (LINHA 32)
        var listaCursos = function () {
            var sucesso = function (dados) {
                $scope.listaDeCursos = dados.data;
            };
            var erro = function (err) {
                alert("Erro"+err)
            };
            cursoAPIService.listarCursos().then(sucesso,erro)
        };

//-----------------------------------------------------------------------------------//
    //GUARDA NO ARRAY  listaCursoSelect OS CURSOS QUE VEM DA FUNCAO listarCursosParaSelect
    // QUE VEM DO CURSOAPISERVICE ATRAVES DA FUNCAO listaCursoParaSelect
        var listaCursosSelect = function () {
            var sucesso = function (dados) {
                $scope.listaDeCursosSelect = dados.data;
            };

            var erro = function (err) {
                alert("Erro"+err)
            };
            cursoAPIService.listarCursosParaSelect().then(sucesso,erro)
        };

//-----------------------------------------------------------------------------------//
    //GUARDA NO ARRAY listaDeDisciplinas O ARRAY QUE VEM DA FUNCAO listarDisciplinas
    // QUE VEM DO DISCIPLINAAPISERVICE ATRAVES DA FUNCAO listarDisciplinas
        var listaDisciplinas = function () {
            var sucesso = function (dados) {
               $scope.listaDeDisciplinas = dados.data;
            };
            var erro = function (err) {
              alert("Erro"+err)
            };
            disciplinaAPIService.listarDisciplinas().then(sucesso,erro);
        };

//-----------------------------------------------------------------------------------//
    //GUARDA NO ARRAY listaDeDisciplinas O ARRAY QUE VEM DA FUNCAO listarDisciplinaPorCurso
    // PASSANDO UM ID DE CURSO
        $scope.listarDisciplinasPorCurso = function (id) {
            if(id){
                var sucesso = function (dados) {
                    $scope.listaDeDisciplinas = dados.data;
                };
                var erro = function (err) {
                    alert("Erro "+err)
                };
                disciplinaAPIService.listarDisciplinasPorCurso(id).then(sucesso,erro);
            }else{
                listaDisciplinas();
            }
        };

//-----------------------------------------------------------------------------------//
    // PASSA A PAGINA ACESSANDO UMA FUNCAO QUE LISTA DISCIPLINA POR PAGINAS DO DISCIPLINAAPISERVICE
        $scope.PassarPag = function (pagina) {
            $scope.pagina = pagina+1;
            disciplinaAPIService.listarDisciplinasPorPagina($scope.pagina).then(function (dados) {
                if(!dados.data.length == 0){
                    $scope.listaDeDisciplinas = dados.data;
                }else{
                    $scope.pagina--;
                }
            },function (err) {
                alert("Deu erro"+err);
            });
        };
// VOLTA A PAGINA ACESSANDO UMA FUNCAO QUE LISTA ISCIPLINA POR PAGINAS DO DISCIPLINAAPISERVICE
        $scope.VoltarPag = function (pagina) {
            $scope.pagina = pagina-1;
            if($scope.pagina == 0){
                $scope.pagina = 1;
            }
            disciplinaAPIService.listarDisciplinasPorPagina($scope.pagina).then(function (dados) {
                if(!dados.data.length == 0){
                    $scope.listaDeDisciplinas = dados.data;
                }
            },function (err) {
                alert("Deu erro"+err);
            });
        };

//-----------------------------------------------------------------------------------//
        $scope.listarDisciplinasPorCurso(0);
        listaCursos();
        listaDisciplinas();
        listaCursosSelect();
});