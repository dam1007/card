const card = document.querySelectorAll('.card');

let cardOne, cardTwo;
//카드가 unflip 될 때까지 사용자 클릭 제한
let matchedCard = 0;
let disableDeck = false;


function flipCard(e){
    //console.log(e.target); back이 선택되므로 css에서 선택되지 않도록 설정.
    let clickedCard = e.target;
    if(clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add('flip'); //카드 클릭 시, 회전.
        if(!cardOne) {
            return cardOne = clickedCard; //cardOne에 clickedCard 할당.
        }
        cardTwo = clickedCard;
        disableDeck = true;
        //console.log(cardOne, cardTwo);
        let cardOneImg = cardOne.querySelector('img').src,
        cardTwoImg = cardTwo.querySelector('img').src;
        matchCards(cardOneImg, cardTwoImg);
    }
    
}

//카드매칭
function matchCards(img1, img2){
    //console.log(img1, img2);
    if(img1 === img2){
        //카드 다 맞추면 리셋
        matchedCard++; 
        if(matchedCard == 8) {
            //return shuffleCard();
            //게임 성공 시 1초 뒤 리셋
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        //return console.log('성공!');
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = '';
        return disableDeck = false;
    }
    //console.log('실패');
    //실패 시, 효과
    setTimeout(() => {
        //첫 카드 클릭 시 shake가 되므로 0.4초 뒤에 애니메이션
        cardOne.classList.add('shake');
        cardTwo.classList.add('shake');
    }, 400);

    setTimeout(() => {
        //1.2초 뒤에 모든 클래스 제거
        cardOne.classList.remove('shake', 'flip');
        cardTwo.classList.remove('shake', 'flip');
        //값 초기화
        cardOne = cardTwo = '';
        disableDeck = false;
    }, 1200);
    
}

//카드 다 매치하면 리셋
function shuffleCard(){
    matchedCard = 0;
    disableDeck = false;
    cardOne = cardTwo = '';
    
    //16번 반복할 수 있는 배열 만들어 한 아이템 당 두번씩 반복하게
    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); //아이템 랜덤하게 정렬
    
    //모든 카드에 flip 클래스 제거, 이미지 랜덤하게 passing
    card.forEach((card, index) => {
        card.classList.remove('flip');
        let imgTag = card.querySelector('img');
        imgTag.src = `assets/img/img-${arr[index]}.svg`;
        card.addEventListener('click', flipCard);
    });
}

shuffleCard();

//console.log(card);
//카드 클릭 시, flipCard() 실행
card.forEach(card => {
    //console.log(card);
    card.addEventListener('click', flipCard);
    //card.classList.add('flip');
});

