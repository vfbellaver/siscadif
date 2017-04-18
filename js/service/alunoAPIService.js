/**
 * Created by Vagner Bellaver on 25/03/2017.
 */

angular.module("siscadifapp").factory("alunoAPIService",function ($http) {

    var _listarAlunos = function () {
            return $http({
                method: "GET",
                url:"http://siscadcpwiv.herokuapp.com/aluno/list/1/5",
            });
        };

    var _listarAlunosPorCurso = function (id) {
        return $http({
            method: "GET",
            url:"http://siscadcpwiv.herokuapp.com/aluno/curso/"+id,
        })
    };

    var _salvarAluno = function (dados) {
        return $http({
            method:"POST",
            url:"http://siscadcpwiv.herokuapp.com/aluno/",
            data:dados
        });
    };

    var _listarAlunosPorPagina = function (id) {
        return $http({
            method: "GET",
            url:"http://siscadcpwiv.herokuapp.com/aluno/list/"+id+"/5",
        });
    };
        return{
            listarAlunos: _listarAlunos,
            listarAlunosPorCurso: _listarAlunosPorCurso,
            salvarAluno: _salvarAluno,
            listarAlunosPorPagina: _listarAlunosPorPagina
        }

});
