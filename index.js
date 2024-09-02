document.getElementById("search-button").addEventListener("click", function () {
  const searchInput = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();
  const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      return response.json();
    })
    .then((data) => {
      // Update Pokémon information
      document.getElementById("pokemon-name").textContent =
        data.name.toUpperCase();
      document.getElementById("pokemon-id").textContent = `#${data.id}`;
      document.getElementById("weight").textContent = `Weight: ${data.weight}`;
      document.getElementById("height").textContent = `Height: ${data.height}`;
      document.getElementById("hp").textContent = data.stats[0].base_stat;
      document.getElementById("attack").textContent = data.stats[1].base_stat;
      document.getElementById("defense").textContent = data.stats[2].base_stat;
      document.getElementById("special-attack").textContent =
        data.stats[3].base_stat;
      document.getElementById("special-defense").textContent =
        data.stats[4].base_stat;
      document.getElementById("speed").textContent = data.stats[5].base_stat;

      // Clear types and add new ones
      const typesElement = document.getElementById("types");
      typesElement.innerHTML = ""; // Clear existing types
      data.types.forEach((typeInfo) => {
        const type = document.createElement("p");
        type.textContent = typeInfo.type.name.toUpperCase();
        typesElement.appendChild(type);
      });

      // Add sprite image
      const sprite = document.getElementById("sprite");
      sprite.src = data.sprites.front_default;
    })
    .catch((error) => {
      alert("Pokémon not found");
    });
});
