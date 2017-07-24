$(function () {
    var card = new Vue({
        el: '#card',
        data: {
            title: 'AAAAAA',
            items: [
                {
                    text: '123'
            },
                {
                    text: '456'
            },
                {
                    text: '789'
            }
            ]
        },
        methods: {
            addItem: function () {
                if($('#itemForm').val() !== ""){
                    this.items.push({
                        text : $('#itemForm').val()
                    })
                    $('#itemForm').val('');
                }
            },
            delItem:function(index){
                console.log(index)
                this.items.splice(index,1)
            }
        }

    });

    var temp = new Vue({
        el:'#temp',
        data: {
            title: 'AAABBBAAA'
        },
        conponets:{
            item:{
                props:['titleArea'],
                template:'<div>{{title}}</div>'
            }
        }
    })


});
