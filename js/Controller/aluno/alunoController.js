/**
 * Created by Vagner Bellaver on 25/03/2017.
 */

angular.module("siscadifapp").controller("alunoController",function ($scope, alunoAPIService, cursoAPIService,$location) {
    //VARIAVEIS SCOPE

    $scope.listaDeCursos=[];
    $scope.listaDeAlunos={};
    $scope.listaDeCursosSelect={};
    $scope.pagina =1;
//-----------------------------------------------------------------------------------//
    //ACESSA O ALUNO API SERVICE E PASSA O JSON CURSO PARA A FUNCAO SALVARALUNO (LINHA15) DO SERVICE
    $scope.salvarAluno = function (aluno) {
            alunoAPIService.salvarAluno(aluno).then(function (dados) {
                alert("Aluno salvo com sucesso");
                $location.url("/listarAlunos")
            },function (err) {
                alert("Deu erro");
        });
    }
//---------------------------------------------------------------------------------------//
    // ACESSA O ALUNO API SERVICE E GUARDA NO ARRAY listaDeAlunos O ARRAY QUE VEM DA FUNCAO LISTARALUNOS DO SERVICE
    var listarAlunos = function () {
        var sucesso = function (dados) {
            $scope.listaDeAlunos = dados.data;
        };

        var erro = function (err) {
            alert("Erro"+err)
        };
        alunoAPIService.listarAlunos().then(sucesso,erro);
    };

//-----------------------------------------------------------------------------------//
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
    // ACESSA O CURSOAPISERVICE E GUARDA NO ARRAY listaDeCursosSelect O ARRAY QUE VEM DA FUNCAO LISTARCURSOSPARASELECT DO SERVICE
    // PARA O SELECT DO HTML
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
    // PASSA A PAGINA ACESSANDO UMA FUNCAO QUE LISTA CURSOS POR PAGINAS DO ALUNOAPISERVICE (LINHA 66)
        $scope.PassarPag = function (pagina) {
            $scope.pagina = pagina+1;
            alunoAPIService.listarAlunosPorPagina($scope.pagina).then(function (dados) {
                if(!dados.data.length == 0){
                    $scope.listaDeAlunos = dados.data;
                }else{
                    $scope.pagina--;
                }
            },function (err) {
                alert("Deu erro"+err);
            });
        };
    // VOLTA A PAGINA ACESSANDO UMA FUNCAO QUE LISTA CURSOS POR PAGINAS DO ALUNOAPISERVICE (LINHA 81)
        $scope.VoltarPag = function (pagina) {
            $scope.pagina = pagina-1;
            if($scope.pagina == 0){
                $scope.pagina = 1;
            }
            alunoAPIService.listarAlunosPorPagina($scope.pagina).then(function (dados) {
                if(!dados.data.length == 0){
                    $scope.listaDeAlunos = dados.data;
                }
            },function (err) {
                alert("Deu erro"+err);
            });
        };
//-----------------------------------------------------------------------------------//
    // ACESSA O ALUNOAPISERVICE E GUARDA NO ARRAY listaDeAlunos
    // O ARRAY QUE VEM DA FUNCAO LISTARALUNOSPORCURSO(LINHA100) DO SERVICE PASSANDO UM ID DO CURSO
        $scope.listarAlunosPorCurso = function (id) {
            if(id){
            var sucesso = function (dados) {
            $scope.listaDeAlunos = dados.data;
            };
            var erro = function (err) {
            alert("Erro por curso"+err)
        };
        alunoAPIService.listarAlunosPorCurso(id).then(sucesso,erro);
            }else{
                listarAlunos();
            }
    };
//-----------------------------------------------------------------------------------//
        $scope.listarAlunosPorCurso(0);
        listarCursos();
        listarAlunos();
        listaCursosSelect();
});
