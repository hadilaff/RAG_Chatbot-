import ChatBox from '../components/ChatBox';
import { Experience } from '../components/Experience';
import { Canvas } from "@react-three/fiber";


const Home = () => {
    return (
        <div className="home flex h-screen">
            {/* Left half for the ChatBox */}
            <div className="w-2/3 ">
                <ChatBox />
            </div>

            {/* Right half for the Canvas with the Experience */}
            <div className="w-1/3">
                <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
                    <color attach="background" args={["#ececec"]} />
                    <Experience />
                </Canvas>
            </div>
        </div>
    );
};

export default Home;
