/**
 * Created by Vagner Bellaver on 25/03/2017.
 */
angular.module("siscadifapp").factory("disciplinaAPIService",function ($http) {

        var _salvarDisciplina = function (dados) {
            return $http({
                method:"POST",
                url:"http://siscadcpwiv.herokuapp.com/disciplina/",
                data:dados
            });
        };
        var _listarDisciplinas = function () {
            return $http({
                method: "GET",
                url:"http://siscadcpwiv.herokuapp.com/disciplina/list/1/5",
            });
        };
        var _listarDisciplinasPorCurso = function (id) {
            return $http({
                method: "GET",
                url:"http://siscadcpwiv.herokuapp.com/disciplina/curso/"+id,
            })
        };

        var _listarDisciplinasPorPagina = function (id) {
            return $http({
                method: "GET",
                url:"http://siscadcpwiv.herokuapp.com/disciplina/list/"+id+"/5",
            });
        };

        return{
            listarDisciplinas: _listarDisciplinas,
            salvarDisciplina: _salvarDisciplina,
            listarDisciplinasPorCurso: _listarDisciplinasPorCurso,
            listarDisciplinasPorPagina: _listarDisciplinasPorPagina
        }
});