(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.coordenador.alunos')
    .controller('bancasCtrl', bancasCtrl);
      
   /** @ngInject */
    function bancasCtrl($scope,$apiService,$window,$modalservice) {
        var vm = $scope;
        vm.bancas = [
            {
                _id:"",
                dataInicio:'01/01/2017',
                dataFim:'01/01/2017',
                ddataMaximaResposta:'01/01/2017',
                status:'E',
                turnos: [
                    {
                        periodo:'M',
                    },
                    {
                        periodo:'T',
                    },
                    {
                        periodo:'N',
                    }
                ],
                professores:[
                    {
                        _id:"",/*PROFESSOR SEM RESPOSTA*/
                        nome:"",
                    },
                    {
                        _id:"",
                        nome:"",
                        resposta:'01/01/2017',
                        confirmado:"N"
                    },
                    {
                        _id:"",
                        nome:"",
                        resposta:'01/01/2017',
                        confirmado:"N"
                    }
                
                ]
            },
            {
                dataInicio:'01/01/2017',
                dataFim:'01/01/2017',
                dataMaximaResposta:'01/01/2017',
                status:'C',
                turnos: [
                    {
                        periodo:'M',
                    },
                    {
                        periodo:'T',
                    },
                    {
                        periodo:'N',
                    }
                ],
                professores:[
                    {
                        _id:"",
                        nome:"",
                        resposta:'01/01/2017',
                        confirmado:"S",
                        turnos:['M','T','N']
                    },
                    {
                        _id:"",
                        nome:"",
                        resposta:'01/01/2017',
                        confirmado:"S",
                        turnos:['M']                        
                    },                
                ]
            },
            {
                dataInicio:'01/01/2017',
                dataFim:'01/01/2017',
                dataMaximaResposta:'01/01/2017',
                status:'C',
                turnos: ['M','T','N'],
                professores:[
                    {
                        _id:"",
                        nome:"",
                        resposta:'01/01/2017',
                        confirmado:"S",
                        turnos:['M','T','N']
                    },
                    {
                        _id:"",
                        nome:"",
                        resposta:'01/01/2017',
                        confirmado:"S",
                        turnos:['M']                        
                    },                
                ]
            }
        ];
    }
    
})();