import React from 'react';
import { Button, Input, GameSelect } from '../../components'
import './index.css'
import type { Host } from '../../types';

export default function MainMenu() {

  const [showRoomsVisible, setShowRoomsVisible] = React.useState(false);
  const [host, setHost] = React.useState<string>('');

  const handleShowRooms = () => {
    setShowRoomsVisible(!showRoomsVisible);
  };

  let [games, setGames] = React.useState<Host[]>([])
  let [selectedGame, setSelectedGame] = React.useState<Host['address'] | undefined>(undefined)

  React.useEffect(() => {
    setGames([
      { address: 'host1', name: 'Gallery One' },
      { address: 'host2', name: 'Gallery Two' },
      { address: 'host3', name: 'Gallery Three' }
    ]);
  }, []);

  return (
    <main>
      <div className='menu'>
        <Button event={() => null} text={"Host a Gallery"} size='50%'/>
        <Button event={handleShowRooms} text={"Join a Gallery"} size='50%'/>
        {showRoomsVisible && (
          <div style={{ display: 'flex', flexDirection: 'column', width: '50%', gap: '5px' }}>
            <div style={{display: 'flex', flexDirection: 'row', gap: 2}}>
              <Input value={host} setValue={setHost}/>
              <Button event={() => null} text={"Join"} size='35%'/>
            </div>
            <GameSelect values={games} selectedValue={selectedGame} setSelectedvalue={setSelectedGame}/>
          </div>
        )}
      </div>
    </main>
  )
}