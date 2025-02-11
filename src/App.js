import NotFound from './components/NotFound';
import Navigation from './components/Navigation';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import PollPage from './components/PollPage';

function App() {
    return (
        <div className="container">
            <Navigation />
            <Routes>
                <Route path="/questions/:id" element={
                    <RequireAuth>
                        {({ question }) =>
                            question ? <PollPage /> : <NotFound />
                        }
                    </RequireAuth>
                } />
                <Route path="*" element={<NotFound />} />

            </Routes>
        </div>
    );
}

export default App; 