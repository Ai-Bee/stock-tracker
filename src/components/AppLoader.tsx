import { createPortal } from 'react-dom';
import '../styles/App.css';

interface LoaderProps {
    active: boolean;
}

export default function AppLoader({active}: LoaderProps) {
    return (
        <div className={`${active ? 'block' : 'hidden'}`}> { createPortal( <div id='animation-container' className='fixed top-0 w-screen h-screen z-50 bg-black bg-opacity-50 flex items-center justify-center'>
        <div className="scene">
            <div className="shadow"></div>
            <div className="jumper">
                <div className="spinner">
                    <div className="scaler">
                        <div className="loader">
                            <div className="cuboid">
                                <div className="cuboid__side"></div>
                                <div className="cuboid__side"></div>
                                <div className="cuboid__side"></div>
                                <div className="cuboid__side"></div>
                                <div className="cuboid__side"></div>
                                <div className="cuboid__side"></div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
            <p className='text-white'> Please Wait</p>
        </div>
        </div>, document.body)}
      </div>

    )
}
