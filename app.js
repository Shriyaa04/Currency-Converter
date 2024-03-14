const baseurl = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
const dropdown= document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const fromClass= document.querySelector(".from select");
const toClass = document.querySelector(".to select");
const mssg= document.querySelector(".result");
for (let select of dropdown){
    for (let currency_code in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currency_code;
        newOption.value=currency_code;
        if (select.name==="from" && currency_code=="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currency_code=="INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption);   
        select.addEventListener("change",(evt)=>{
            updateFlag(evt.target);
        })
    }
}
const updateFlag=(element)=>{
    let currency_code=element.value;
    let country_code=countryList[currency_code];
    newSrc=`https://flagsapi.com/${country_code}/flat/64.png`
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};
btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    console.log(amount);
    let amtvalue=amount.value;
    console.log(amtvalue);
    if(amtvalue==="" || amtvalue<1)
    {
        amtvalue=1;
        amtvalue.value="1";
    }
    const url=`${baseurl}/${fromClass.value.toLowerCase()}.json`;
    console.log(url);
    let response =await fetch(url);
    let data = await response.json();
    console.log(data);
    let rate=data[fromClass.value.toLowerCase()][toClass.value.toLowerCase()];
    console.log(rate);
    let finalAmt= rate* amtvalue;
    mssg.innerText=`${amtvalue}${fromClass.value} = ${finalAmt}${toClass.value}`;

})

