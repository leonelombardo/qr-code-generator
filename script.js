const $ = e => document.querySelector(e);
const $input = $("#input");
const $error = $("#error"); 
const $successful = $("#successful"); 
const $generateQrText = $("#generate-qr-h2");
const $generateButton = $("#generate-button");
const $img = $("#qr-code-img");

$generateButton.addEventListener("click", (e)=>{
    e.preventDefault();

    const { value } = $input;
    const { length } = value;

    if(value.length < 1){
        $successful.innerHTML = ""
        $successful.classList.add("display-none");

        error.classList.remove("display-none");
        return error.innerHTML = `Please type something.`
    }

    if(!value.startsWith("https://")){
        $successful.innerHTML = ""
        $successful.classList.add("display-none");

        error.classList.remove("display-none");
        return error.innerHTML = `Please add "https://" before link.`
    }

    if(length < 12){
        $successful.innerHTML = ""
        $successful.classList.add("display-none");

        error.classList.remove("display-none");
        return error.innerHTML = `Your link must've 12 characters at least.`
    }

    error.classList.add("display-none");
    error.innerHTML = "";

    const fetchData = async (link)=> {
        await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${value}`)
        .then(response => response,
            $generateButton.innerHTML = `<i class="ph-circle-notch-bold spinner"></i> Loading`,
            $generateButton.setAttribute("disabled", "true")
        )
            .then(response => {
                $img.src = response.url;
                $img.classList.add("qr-code-result-img")
                $generateQrText.innerHTML = "";
                $successful.innerHTML = "Ready for scanning."
                $successful.classList.remove("display-none");
                $generateButton.removeAttribute("disabled");
                $generateButton.innerHTML = `Generate`;
            })
        .catch(err => console.error(err));
    }
    
    return fetchData()
})