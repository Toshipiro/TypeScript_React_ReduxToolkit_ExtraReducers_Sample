import { FC, useEffect } from 'react';
import { Pet, PetStatusEnum } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { getPets } from './petSlice';

/**
 * Dispatch the PetSlice action which calls Axios to get a pet list in REST server and store it into the slice store.
 * Show a pet list sotred in PetSlice Store and size of it.
 * @returns
 */
export const PetList: FC = () => {
  /** Root dispach to access slice action. */
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /** Store in PetSlice */
  const pets = useSelector((state: RootState) => state.pet.value);

  /**
   * Dispach PetSlice action to get a pet list.
   * @param userData availability of pets which is used as a filter.
   */
  const handleGetPets = async (userData: string) => {
    const resultAction = await dispatch(getPets(userData));
    if (getPets.fulfilled.match(resultAction)) {
      console.log('handleUpdateUser success');
    } else {
      if (resultAction.payload) {
        console.log(`failed: ${resultAction.error.message}`);
      } else {
        console.log(`failed: ${resultAction.error.message}`);
      }
    }
  };

  /** Show all pets initially. */
  useEffect(() => {
    handleGetPets(PetStatusEnum.Available);
  }, []);

  /** Show the pet list which will be updated when the store is changed.  */
  const content = pets.map((pet: Pet) => (
    <ul key={pet.id}>
      <li>
        id: {pet.id}, name: {pet.name}
      </li>
    </ul>
  ));

  return (
    <div>
      <p>Pet list Component</p>
      <p>count : {pets.length}</p>
      {content}
    </div>
  );
};
