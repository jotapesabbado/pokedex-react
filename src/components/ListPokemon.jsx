import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons, fetchPokemonDetails } from '../state/slice/pokemonSlice';
import CardPokemon from './CardPokemon'
import { Container, Row } from 'react-bootstrap';


const ListPokemon = () => {
  const { entities } = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();
  
  const [fetchedUrls, setFetchedUrls] = useState(new Set());

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  useEffect(() => {
    const fetchDetailsForPokemon = async () => {
      const promises = entities.map((pokemon) => {
        if (!fetchedUrls.has(pokemon.url)) {
          setFetchedUrls(prevUrls => new Set([...prevUrls, pokemon.url]));
          return dispatch(fetchPokemonDetails(pokemon.url));
        }
        return Promise.resolve();
      });
      await Promise.all(promises);
    };

    if (entities.length > 0) {
      fetchDetailsForPokemon();
    }
  }, [dispatch, entities, fetchedUrls]);

  return (
    <Container fluid="md">
        <Row>
        {entities && entities.map(({ name, details }, i) => (
            <CardPokemon key={i} name={name} details={details} />
        ))}
        </Row>
  </Container>
  );
};

export default ListPokemon;
