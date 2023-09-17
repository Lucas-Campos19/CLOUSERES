(function(){
function carrinho(){
    const sacola = recuperarCarrinhoSalvo();
    function addProduto(produto){
        const index = encontrarItemIndex(produto.name)
        if(index !== -1){
            sacola[index].quantidade += produto.quantidade
        }
        else{
            sacola.push({
                id: sacola.length + 1,
                name: produto.name,
                descricao: produto.descricao,
                quantidade: produto.quantidade,
                preco: produto.preco
            })
        }
        atualizarCarrinho();
        Swal.fire({
            position : 'center',
            icon: 'success',
            title: 'Produto adicionado na sacola!',
            timer: 3000
        })
        salvarCarrinho();
    }
    function calcularTotal(){
        let total = 0;
        for(const produto of sacola){
            total += produto.preco * produto.quantidade
        }
        return total;
    }
    function getSacola(){
        return sacola;
    }
    function encontrarItemIndex(nomeItem){
        return sacola.findIndex(produto => produto.name == nomeItem)
    }
    function salvarCarrinho(){
        const carrinhoJSON = JSON.stringify(sacola);
        localStorage.setItem("carrinho", carrinhoJSON);
    }
    function recuperarCarrinhoSalvo(){
        const carrinhoJSON = localStorage.getItem("carrinho");
        if(carrinhoJSON){
            return JSON.parse(carrinhoJSON);
        }
        return [];
    }
    return{
        addProduto: addProduto,
        getSacola: getSacola,
        calcularTotal: calcularTotal
    }
}

const minhaSacola = carrinho();

const finalzarCompraBtn = document.getElementById("finalizar-compra");

const addBtns = document.querySelectorAll(".add-btn");

addBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const nomeItem = btn.getAttribute("data-name");
        const precoItem = parseFloat(btn.getAttribute("data-preco"));
        minhaSacola.addProduto({
            name: nomeItem,
            preco:precoItem,
            quantidade: 1

        });
    }) 
})

function atualizarCarrinho(){
    const carrinhoItensDiv = document.getElementById("carrinho-itens")
    const totalCarrinho = document.getElementById("total-carrinho")

    carrinhoItensDiv.innerHTML = ""
    totalCarrinho.textContent= ""

    let total = 0;
    minhaSacola.getSacola().forEach(item => {
        total += item.preco * item.quantidade;
        carrinhoItensDiv.innerHTML += 
        `<div class="dropdown-item">${item.name} Qtd: ${item.quantidade} - R$ ${item.preco.toFixed(2)}</div>`;
    });
    totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;

    window.addEventListener('load', (Event) =>{
        atualizarCarrinho();
    })
}
})();
