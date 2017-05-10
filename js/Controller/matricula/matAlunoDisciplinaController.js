/**
 * Created by vfbellaver on 27/04/2017.
 */
angular.module("siscadifapp").controller("matAlunoDisciplinaController",
    function ($scope,disciplinaAPIService,cursoAPIService,alunoAPIService,matriculaAPIService,$location) {
    $scope.listaDeCursosSelect=[];
    $scope.listaDeDisciplinasSelect=[];
    $scope.listaDeDisciplinasSelect={};
    $scope.listaDeAlunos=[];
    $scope.listaDeSemestre=[];
    $scope.listaAluMatSemestre=[];
    $scope.listaDeAlunos={};
    $scope.selected=[];
    $scope.listaDeAlunosSelecionados = [];
    $scope.pagina =1;
//-----------------------------------------------------------------------------------//
    $scope.checked = function (aluno) {
        return $scope.selected.indexOf(aluno) > -1;
    }

    $scope.clicked = function (aluno) {
        var idx = $scope.selected.indexOf(aluno);
        if(idx > -1){
            $scope.selected.splice(idx, 1);
        }else{
            $scope.selected.push(aluno);
        }
    }
//-----------------------------------------------------------------------------------//
    $scope.checkAll = function () {
        if($scope.selectAll){
            angular.forEach($scope.listaDeAlunos, function (aluno) {
                idx = $scope.selected.indexOf(aluno);
                if(idx>=0){
                    return true;
                }else{
                    $scope.selected.push(aluno);
                }
            })
        }else{
            $scope.selected = [];
        }
    }
//-----------------------------------------------------------------------------------//
    $scope.enviarAlunos = function () {
        $scope.listaDeAlunosSelecionados = [];
        for (var i = 0; i < $scope.selected.length; i++){
                $scope.listaDeAlunosSelecionados.push($scope.selected[i]);
        }
    }
//-----------------------------------------------------------------------------------//
    $scope.cadastrarAlunos = function (idDisc,idSem) {
        $scope.listaCadastro=[];
        for (var i = 0; i < $scope.listaDeAlunosSelecionados.length; i++){
            var referencia = {};
            referencia.DisciplinaId = idDisc
            referencia.AlunoId = $scope.listaDeAlunosSelecionados[i].id;
            referencia.SemestreId = idSem
            $scope.listaCadastro.push(referencia);
        }


        matriculaAPIService.salvarMatriculas($scope.listaCadastro).then(function () {
            alert("Matriculas realizadas com sucesso");
            $location.url("/")
        },function (err) {
            alert("Deu erro ao matricular");
        });
    };
//-----------------------------------------------------------------------------------//
    $scope.alunosSemDisc = function (idCur,idSem,idDisc) {
       if(idSem!=null){
            $scope.listarAlunosPorCurso(idCur)
        var sucesso = function (dados) {
            $scope.listaAluMatSemestre = dados.data;
            atualizarListadeAlunos();
        };

        var erro = function (err) {
            alert("Erro função alunosSemDisc (linha 80) "+err)
        };

        matriculaAPIService.listaMatSemestreDisciplina(idSem,idDisc).then(sucesso,erro)

       }
    };
//-----------------------------------------------------------------------------------//
    var atualizarListadeAlunos = function () {
        for (var i = 0; i < $scope.listaAluMatSemestre.length; i++){
            for (var j = 0; j < $scope.listaDeAlunos.length; j++){
                if($scope.listaDeAlunos[j].id == $scope.listaAluMatSemestre[i].alunoid){
                    $scope.listaDeAlunos.splice(j,1);
                }
            }
        }
    }
//-----------------------------------------------------------------------------------//
        $scope.listarDisciplinasSelect = function (id) {
            if(id){
                var sucesso2 = function (dados) {
                    $scope.listaDeDisciplinasSelect = dados.data;
                };
                var erro2 = function (err) {
                    alert("Erro função listarDisciplinasSelect (linha 104)"+err)
                };
                disciplinaAPIService.listarDisciplinasPorCurso(id).then(sucesso2,erro2);
                listarSemestres();
            }else{
                $scope.listaDeDisciplinasSelect=[];
                $scope.listaDeDisciplinasSelect=[];
                $scope.listaDeSemestre=[];
                $scope.listaAluMatSemestre=[];
            }
        };
//-----------------------------------------------------------------------------------//
        // ACESSA O ALUNOAPISERVICE E GUARDA NO ARRAY listaDeAlunos
        // O ARRAY QUE VEM DA FUNCAO LISTARALUNOSPORCURSO(LINHA100) DO SERVICE PASSANDO UM ID DO CURSO
        $scope.listarAlunosPorCurso = function (id) {
            if(id){
                alert(id)
                var sucesso = function (dados) {
                    $scope.listaDeAlunos = dados.data;
                };
                var erro = function (err) {
                    alert("Erro função listaAlunosPorCurso (linha 123)"+err)
                };
                alunoAPIService.listarAlunosPorCurso(id).then(sucesso,erro);

                listarDisciplinasPorCurso(id);

            }else{
                $scope.listaDeAlunos = [];
            }
        };
        // //-----------------------------------------------------------------------------------//
        // // PASSA A PAGINA ACESSANDO UMA FUNCAO QUE LISTA CURSOS POR PAGINAS DO ALUNOAPISERVICE (LINHA 66)
        // $scope.PassarPag = function (pagina) {
        //     $scope.pagina = pagina+1;
        //     alunoAPIService.listarAlunosPorPagina($scope.pagina).then(function (dados) {
        //         if(!dados.data.length == 0){
        //             $scope.listaDeAlunos = dados.data;
        //         }else{
        //             $scope.pagina--;
        //         }
        //     },function (err) {
        //         alert("Deu erro"+err);
        //     });
        // };
        // // VOLTA A PAGINA ACESSANDO UMA FUNCAO QUE LISTA CURSOS POR PAGINAS DO ALUNOAPISERVICE (LINHA 81)
        // $scope.VoltarPag = function (pagina) {
        //     $scope.pagina = pagina-1;
        //     if($scope.pagina == 0){
        //         $scope.pagina = 1;
        //     }
        //     alunoAPIService.listarAlunosPorPagina($scope.pagina).then(function (dados) {
        //         if(!dados.data.length == 0){
        //             $scope.listaDeAlunos = dados.data;
        //         }
        //     },function (err) {
        //         alert("Deu erro"+err);
        //     });
        // };

//-----------------------------------------------------------------------------------//
    var listaCursosSelect = function () {
        var sucesso = function (dados) {
            $scope.listaDeCursosSelect = dados.data;
        };

        var erro = function (err) {
            alert("Erro função listaCursosSelect (linha 169)"+err)
        };
        cursoAPIService.listarCursosParaSelect().then(sucesso,erro)
    };
//-----------------------------------------------------------------------------------//
    var listarDisciplinasPorCurso = function(id){
        var sucesso2 = function (dados) {
            $scope.listaDeDisciplinasSelect = dados.data;
        };
        var erro2 = function (err) {
            alert("Erro função listarDisciplinasPorCurso (linha 179)"+err)
        };
        disciplinaAPIService.listarDisciplinasPorCurso(id).then(sucesso2,erro2);
    }
//-----------------------------------------------------------------------------------//
    var listarSemestres = function () {
        $scope.listaDeSemestre=[];
        var sucesso = function (dados) {
            $scope.listaDeSemestre = dados.data;
        };

        var erro = function (err) {
            alert("Erro 188"+err)
        };
        matriculaAPIService.listarSemestres().then(sucesso,erro);
    };
//-----------------------------------------------------------------------------------//
    listaCursosSelect();



});