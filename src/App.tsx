import { FC } from 'react';
import { PetList } from './features/pet/PetList';
import { PetInput } from './features/pet/PetInput';

/**
 * Show a form to add a pet and the pet list.
 * @returns
 */
export const App: FC = () => {
  return (
    <div>
      <header>
        {/** Show a form to create a new pet record in the store. */}
        <PetInput />
        {/** Show pet records in the store. */}
        <PetList />
      </header>
      <p>
        Edit db.json file to clear data. This application does not implement a
        delete function to simplify the code.
      </p>
    </div>
  );
};
