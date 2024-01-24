class PokemonElement extends HTMLElement {
  get pokeList() {
    return this._pokeList;
  }

  set pokeList(v) {
    this._pokeList = v;
    this.render();
  }

  constructor() {
    super();
    this.fetchPokemon();
  }

  async fetchPokemon() {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
    );
    const { results } = await response.json();

    this.pokeList = [];

    this.pokeList = await Promise.all(
      results.map((poke) => {
        return fetch(poke.url)
          .then((response) => response.json())
          .then((result) => result.sprites.front_shiny);
      })
    );

    // for (const poke of results) {
    //   const response = await fetch(poke.url);
    //   const result = await response.json();
    //   this.pokeList = [...this.pokeList, result.sprites.front_shiny];
    // }
  }

  render() {
    this.innerHTML = this.pokeList
      .map(
        (poke) => `
      <img src="${poke}"></img>
    `
      )
      .join("");
  }
}

customElements.define("pokemon-element", PokemonElement);
