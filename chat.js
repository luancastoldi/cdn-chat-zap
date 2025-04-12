const scriptURL = new URL(document.currentScript.src);
const phone = scriptURL.searchParams.get('ph');
const message = scriptURL.searchParams.get('msg');

var isPopUpWpVisible = true;
const START_MESSAGE = "Olá, como posso ajudar?"
const FOTO_PERFIL = "https://media-gru2-2.cdn.whatsapp.net/v/t61.24694-24/300530875_481581893334477_5535688905085636127_n.jpg?ccb=11-4&oh=01_Q5Aa1QFMhjPpnqlZmz_JP1n0cQrcRVn5Oq8_Z02Y48kf8Ka8cw&oe=6807E9D1&_nc_sid=5e03e0&_nc_cat=108"
const layout = `
  <zapme-wp-chat>
            <div class="chat">
                <div>
                    <div>
                        <img src="${FOTO_PERFIL}" alt="foto de perfil">
                    </div>
                    <div>
                        <span>Luan</span>
                        <span>Online</span>
                    </div>
                </div>

                <div>
                    <span>${START_MESSAGE}</span>
                    <input id="msg-chat-wa" type="text" placeholder="Mensagem" value="">
                    <button id="btn-send-chat-wa">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <path fill="white" d="M3 20v-6l8-2l-8-2V4l19 8z" />
                        </svg>
                    </button>
                </div>
            </div>
            <icon id="icon-wa">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 256 258"><defs><linearGradient id="logosWhatsappIcon0" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#1faf38"/><stop offset="100%" stop-color="#60d669"/></linearGradient><linearGradient id="logosWhatsappIcon1" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stop-color="#f9f9f9"/><stop offset="100%" stop-color="#fff"/></linearGradient></defs><path fill="url(#logosWhatsappIcon0)" d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"/><path fill="url(#logosWhatsappIcon1)" d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"/><path fill="#fff" d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64" stroke-width="6.5" stroke="#fff"/></svg>
            </icon>
        </zapme-wp-chat>
`

const style = document.createElement("style");
style.innerHTML = `
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
zapme-wp-chat {

    font-family: "Open Sans", sans-serif;
    position: fixed;
    height: 60px;
    right: 30px;
    bottom: 35px;
    text-align: right;
    z-index: 99999999;


    >span {
        background-color: white;
        padding: 5px;
        border-radius: 5px;
        font-size: 13px;
        bottom: 10px;
        box-shadow: rgba(192, 192, 192, 0.414) 1px 2px 2px 2px;
    }

    >icon {
        position: fixed;
        right: 15px;
        bottom: 15px;
        width: 60px;
        height: 60px;
        z-index: -1;

        &:hover {
            cursor: pointer;
        }
    }

    >.chat {
        animation: pop-up-wp 0.4s;
        translate: 10px -155px;
        width: 200px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.266) 1px 1px 1px 1px;

        >div {            
            padding: 5px;

            &:first-of-type {
                background-color: #008069;
                display: flex;
                text-align: left;
                gap: 10px;
                padding: 10px;

                img {
                    width: 45px;
                    height: 45px;
                    border-radius: 100px;


                }

                &::before {
                    position: absolute;
                    content: "";
                    width: 10px;
                    height: 10px;
                    background-color: #25D366;
                    outline: 3px solid #008069;
                    translate: 35px 35px;
                    border-radius: 10px;
                }

                >div {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                span {
                    color: white;
                    font-weight: 300;

                    &:last-of-type {
                        font-weight: 100;
                        font-size: 12px;
                    }
                }
            }

            &:last-of-type {
                text-align: left;
                height: 100px;
                background-color: #EBE4DC;
                padding: 10px;
                box-sizing: border-box;
                

                >input {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    padding: 5px 10px;
                    height: 40px;
                    outline: none;
                    border: none;
                    font-weight: 300;
                    color: #2c2c2c;

                    &::placeholder {
                        color: silver;
                    }

                    /* translate: 10px 100px; */
                    /* background-color: red; */
                }

                >button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    translate: 155px 37px;
                    background-color: #25D366;
                    padding: 3px;
                    font-weight: 300;
                    color: white;
                    border: none;
                    border-radius: 100px;

                    >svg{
                        translate: 1px
                    }

                    &:hover {
                        background-color: #008069;
                        cursor: pointer;
                    }

                }

                >span {
                    background-color: white;
                    padding: 5px;
                    line-height: 10px;
                    border-radius: 5px;
                    font-weight: 200;
                    color: black;
                    line-height: 1.5;
                    font-size: 14px;
                    overflow: hidden;



                    &::before {
                        position: absolute;
                        left: 0px;
                        width: 15px;
                        translate: 0 -3px;
                        height: 15px;
                        border-end-start-radius: 200px;
                        content: "";
                        background-color: white;

                    }
                }
            }

        }

    }

    &::before {
        position: absolute;
        border-radius: 100px;
        top: 20px;
        z-index: 3;
        content: "";
        height: 13px;
        width: 15px;
        background-color: red;
        outline: #2c2c2c 2px solid;
    }
}
`;


document.head.appendChild(style);
document.querySelector('body').insertAdjacentHTML('afterbegin', layout);

document.getElementById('icon-wa').addEventListener('click', () => {
    const popUpWhatsApp = document.querySelector('.chat');
    popUpWhatsApp.style.visibility = isPopUpWpVisible ? "hidden" : "visible"
    isPopUpWpVisible = !isPopUpWpVisible;
})

const inputMessage = document.getElementById('msg-chat-wa');
inputMessage.value = message
document.getElementById('btn-send-chat-wa').addEventListener('click', () => {
    window.open(`https://api.whatsapp.com/send/?text=${inputMessage.value}&phone=${phone}`, '_blank')
})