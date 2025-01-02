const RandamChoseApp =()=>{
  let characters = []
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
      const response = await fetch('./ValorantContent.json');
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
    const shuffled = characters.sort(() => 0.5 - Math.random());
  const randomCharacters = shuffled.slice(0, 5);
  console.log(characters)
  randomCharacters.forEach(character => {
    const li = document.createElement("li");
    li.textContent = character.name;
    listElement.appendChild(li);
  });
  }

  const onButtonClick = async () => {
    await LoadCharacters(); // キャラクターをロード
    DisplayRandamCharacter(); // キャラクターを表示
    
  };
  
  const buttonElement = document.getElementById('generateButton');
  buttonElement.addEventListener('click', onButtonClick);
};
// ボタンクリック時にリストを初期化してキャラクターを表示する
const initialize = async () => {
  await LoadCharacters(); // キャラクターをロード
  DisplayRandamCharacter(); // ランダムキャラクターを表示
};

// ボタンにイベントリスナーを追加
document.getElementById("generateButton").addEventListener("click", initialize);


export default RandamChoseApp;