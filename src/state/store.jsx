import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./slice/conterSlice"
import pokemonReducer from "./slice/pokemonSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        pokemon: pokemonReducer
    }
})
