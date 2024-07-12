import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

export const fetchPokemons = createAsyncThunk("pokemon/fetchPokemons", async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon")
    const pokemons = await response.json()
    console.log("fetchPokemons")
    return pokemons["results"]  
})

export const fetchPokemonDetails = createAsyncThunk("pokemon/fetchPokemonDetails", async (url) => {
    const response = await fetch(url)
    const pokemons = await response.json()
    console.log("fetchPokemonDetails")
    return pokemons
}) 

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        entities: [],
        loading: false,
      },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPokemons.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(fetchPokemons.fulfilled, (state, action) => {
            state.loading = false
            state.entities = action.payload.map((pokemon) => ({
                ...pokemon,
                details: null
            }))
        }),
        builder.addCase(fetchPokemons.rejected, (state) => {
            state.loading = false
        }),
        builder.addCase(fetchPokemonDetails.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(fetchPokemonDetails.fulfilled, (state, action) => {
            
            const pokemon = state.entities.find((p) => p.url === action.meta.arg);
            if (pokemon){
                state.loading = false
                pokemon.details = action.payload
            }
        }),
        builder.addCase(fetchPokemonDetails.rejected, (state) => {
            state.loading = false
        })
    }
})

// export const { fetchPokemons } = pokemonSlice.actions
export default pokemonSlice.reducer