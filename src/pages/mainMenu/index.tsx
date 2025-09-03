import React from 'react';
import { Button, Input } from '../../components'
import './index.css'

export default function MainMenu() {

  const [showRoomsVisible, setShowRoomsVisible] = React.useState(false);
  const [host, setHost] = React.useState<string>('');

  const handleShowRooms = () => {
    setShowRoomsVisible(!showRoomsVisible);
  };

  return (
    <main>
      <div className='menu'>
        <Button event={() => null} text={"Host a Gallery"} />
        <Button event={handleShowRooms} text={"Join a Gallery"} />
        {showRoomsVisible && (
          <div>
            <Input value={host} setValue={setHost}/>
          </div>
        )}
      </div>
    </main>
  )
}