const suggestionList : HTMLElement = document.getElementById("suggestions") as HTMLElement
const sun : HTMLInputElement = document.getElementById("sun") as HTMLInputElement
const moon : HTMLInputElement = document.getElementById("moon") as HTMLInputElement
const rising : HTMLInputElement = document.getElementById("rising") as HTMLInputElement

sun.addEventListener('change', postAndUpdate);
moon.addEventListener('change', postAndUpdate);
rising.addEventListener('change', postAndUpdate);

type MatchesRequestData = {
  sun: string,
  moon: string,
  rising: string
}

type Matches = {
  matches: string[]
}

function postAndUpdate(): void {
  suggestionList.innerHTML = ""

  const postParameters : MatchesRequestData = {
    sun : sun.value,
    moon : moon.value,
    rising : rising.value
  };

  console.log(postParameters)

  fetch('http://localhost:4567/matches', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(postParameters)
  }).then(response => response.json())
      .then((data: Matches) => {
        console.log(data);
        updateSuggestions(data.matches);
      })
}

function updateSuggestions(matches: string[]): void {
  for (var match of matches) {
    suggestionList.innerHTML += `<li tabindex="0">${match}</li>`
  }
}

document.addEventListener("keyup", async (event : KeyboardEvent) => {
  if (event.key == 'r') {
    await updateValues("Leo", "Cancer", "Capricorn");
    postAndUpdate();
  }
});

async function updateValues(sunval: string, moonval: string, risingval: string): Promise<void>{
  // This line asynchronously waits 1 second before updating the values.
  // It's unnecessary here, but it simulates asynchronous behavior you often have to account for.
  await new Promise(resolve => setTimeout(resolve, 1000));

  sun.value = sunval;
  moon.value = moonval;
  rising.value = risingval;
}
