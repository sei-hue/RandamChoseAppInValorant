const RandamChoseApp =()=>{
  let characters = []
  let currentLanguage ='ja-JP'; // 初期言語を日本語に設定
  const toggleLoadingIndicator = (isLoading) => {
    const loadingElement = document.getElementById('loadingIndicator');
    if (isLoading) {
      loadingElement.style.display = 'block'; // ローディング中のメッセージを表示
    } else {
      loadingElement.style.display = 'none'; // ローディング中のメッセージを非表示
    }
  };
  const LoadCharacters =async ()=>{
    try{
      toggleLoadingIndicator(true); // ローディング開始
      const response = await fetch('./ValorantContentGlobal.json');
      const data = await response.json();
      characters = data.characters;
    }
    catch(error) {
      console.error('エラー:', error.message);
    }finally {
      toggleLoadingIndicator(false); // ローディング終了
    }
  }

  const DisplayRandamCharacter =()=>{
    const listElement = document.getElementById("characterList");
    listElement.innerHTML = ""; // リストをリセット

    if (!characters.length) {
      listElement.innerHTML = '<li>No characters available</li>';
      return;
    }

    const shuffled = characters.sort(() => 0.5 - Math.random());
  const randomCharacters = shuffled.slice(0, 5);
  randomCharacters.forEach(characters => {
    const li = document.createElement("li");
    li.textContent = characters.localizedNames[currentLanguage] || characters.localizedNames["ja-JP"]; // 選択言語に基づく名前を表示
    listElement.appendChild(li);
  });
  }

  const onButtonClick = async () => {
    await LoadCharacters(); // キャラクターをロード
    DisplayRandamCharacter(); // キャラクターを表示
    
  };
  
  const buttonElement = document.getElementById('generateButton');
  buttonElement.addEventListener('click', onButtonClick);
  // ボタンクリック時にリストを初期化してキャラクターを表示する

  const ChangeLanguage = (newLanguage) => {
    currentLanguage = newLanguage;
    DisplayRandamCharacter(); // 言語変更後に再表示
  };

const initialize = async () => {
  await LoadCharacters(); // キャラクターをロード
  DisplayRandamCharacter(); // ランダムキャラクターを表示
};


// ボタンにイベントリスナーを追加
document.getElementById("generateButton").addEventListener("click", initialize);

 // 言語切り替えボタンにイベントを追加
 document.getElementById("languageSelector").addEventListener("change", (event) => {
  ChangeLanguage(event.target.value);
});
//initialize();
};


export default RandamChoseApp;