function pagamento(metodo){
      document.getElementById("credito").classList.remove("active")
      document.getElementById("debito").classList.remove("active")
    if(metodo === "credito" ){
        document.getElementById("credito").classList.add("active")
    }else{
        document.getElementById("debito").classList.add("active")
    }
}

function verificar(){
    let telefone = document.getElementById("telefone").value
    let endereço = document.getElementById("endereço").value
    // let cartao = document.getElementById("numero").value
    // let cvv = document.getElementById("cvv").value
    let cep = document.getElementById("cep").value
    let nome = document.getElementById("nome").value
    let numero = document.getElementById("numero_en").value

    let campo = [].slice.call(document.querySelectorAll('.campo'));
    let campo2 = []
    campo.forEach((camp) => {
        campo2.push(camp.value)

    })


    if (document.querySelector("#pix").checked){
        campo2[5] = "a"
        campo2[6] = "a"
        campo2[7] = "a"
        campo2[8] = "a"

    }

    if(campo2[6] != ''){
        campo2[9] = campo2[5]
        campo2[10] = campo2[6]
        campo2[11] = campo2[7]
        campo2[12] = campo2[8]

    }else{
        campo2[5] = campo2[9]
        campo2[6] = campo2[10]
        campo2[7] = campo2[11]
        campo2[8] = campo2[12]

    }

    
    let retornar = true 

    campo2.forEach((camp) => {
        if(camp == ''){
            retornar = false

        }

    })

    if(retornar == false){
        alert("Por favor preencha todos os campos")
        return false

    }

    let metodo = [].slice.call(document.querySelectorAll('.radio'));
    let metodo2 = []
    metodo.forEach((met) => {
        metodo2.push(met.checked)

    })

    let metodos = false 

    metodo2.forEach((met) => {
        if(met === true){
            metodos = true
        }

    })
    

    if(metodos === false){
        alert("Por favor escolha uma forma de pagamento")
        return false

    }

    let check = [].slice.call(document.querySelectorAll('.check'));
    let check2 = []
    check.forEach((checkbox) => {
        check2.push(checkbox.checked)

    })

    let checados = false 

    check2.forEach((checkbox) => {
        if(checkbox === true){
            checados = true
        }

    })

    if(checados === false){
        alert("Por favor escolha um ou mais itens")
        return false

    }


    if(telefone.length != 11){
        alert("Por favor insira um número valido com o DDD")
        return false

    }

    if(isNaN(numero) || isNaN(cep) || isNaN(campo2[7]) || isNaN(campo2[6]) || isNaN(telefone)){
        alert("Os campo de CEP, CVV, Número de Cartão, Telefone e Número da casa devem ser preenchidos apenas com números")
        return false

    }

    if(campo2[7].length != 3){
        alert("Por favor insira um CVV válido")
        return false

    }

    if(cep.length != 8){
        alert("Por favor insira um CEP valido")
        return false

    }

    if(campo2[6].length != 16){
        alert("Por favor insira um número de cartão válido")
        return false

    }

    let primeira_letra = Array.from(nome)[0]
    let primeira_letra_up = primeira_letra.toUpperCase()
    let nome_completo = nome.split(' ')

    if(nome_completo[1] == undefined){
        alert("Por favor insira seu nome completo")
        return false
    }

    if(primeira_letra != primeira_letra_up){
        alert("Por favor insira seu nome com a letra maiúscula")
        return false

    }

    return true
}

 





  let PEDIDOS_QTD = 1832490;

  let pedido = {
    itens: "",
    data: "",
    nome: "",
    endereco: "",
    pagamento: "",
  };

  const formulario =  document.forms[0]
  const tbody = document.querySelector("table > tbody");

  function getElements (pedido) {

    const itens = document.querySelectorAll(".check")

    let itens2 = []

    let select = []
    let i = 0

    pedido["itens"] = ""

    itens.forEach((item) => {
        itens2.push(item.checked)
    
     })
    
    itens2.forEach((item) => {
        if ( item == true){
            select.push(itens[i])
        }
    
        i++
    
        // console.log(itens ,  itens2 , i , select )
    
    })



    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}/${month}/${year}`;

    select.forEach((item) => {
        
        pedido["itens"] = item.value + ", " + pedido["itens"]
        console.log(select , item ,pedido["itens"] )
    })
    
    pedido["data"] = currentDate
    pedido["nome"] = formulario["nome"].value
    pedido["endereco"] = `${formulario["endereço"].value} , ${formulario["numero_en"].value}`

    let tipo_pag = document.querySelectorAll(".radio")

    tipo_pag.forEach((tipo) => {
        if(tipo.checked){
            pedido["pagamento"] = tipo.value
        }
        
    })
     


  }

  const addLinha = (pedido) => {
    getElements(pedido)

    const linha = document.createElement("tr");
    const idLinha = document.createElement("th");
    idLinha.setAttribute("scope", "row");
    idLinha.textContent = PEDIDOS_QTD + 1;
    linha.appendChild(idLinha);
    Object.keys(pedido).forEach((chave) => {
      const coluna = document.createElement("td");
      coluna.textContent = pedido[chave];
      linha.appendChild(coluna);
    });

    tbody.appendChild(linha);
    PEDIDOS_QTD++;
  };

 


  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    // verificar()
    const valido = verificar()
    if(valido === true){
        addLinha(pedido);
    }
    
  });
