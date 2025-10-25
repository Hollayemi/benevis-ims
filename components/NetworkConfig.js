import { useState, useEffect } from 'react';

export default function NetworkConfig() {
    const [backendUrl, setBackendUrl] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfig, setShowConfig] = useState(false);

    useEffect(() => {
        const savedUrl = localStorage.getItem('backendUrl');
        if (savedUrl) {
            setBackendUrl(savedUrl);
            checkConnection(savedUrl);
        } else {
            setShowConfig(true);
        }
    }, []);

    const checkConnection = async (url) => {
        setIsLoading(true);
        console.log({ url })
        try {
            const response = await fetch(`${url}/health`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response)
            setIsConnected(response.ok);
            return response.ok;
        } catch (error) {
            console.log(error)
            setIsConnected(false);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!backendUrl) return;

        const normalizedUrl = backendUrl.replace(/\/$/, '');
        const connected = await checkConnection(normalizedUrl);

        if (connected) {
            localStorage.setItem('backendUrl', normalizedUrl);
            setShowConfig(false);
        } else {
            alert('Cannot connect to backend server. Please check the URL and try again.');
        }
    };

    const getLocalIP = () => {
        const placeholder = 'e.g., http://192.168.1.100:3001/api';
        return placeholder;
    };

    if (!showConfig && isConnected) {
        return (
            <div className="fixed bottom-4 right-4 z-50">
                <button
                    onClick={() => setShowConfig(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Network
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Backend Server Configuration</h2>
                    {!showConfig && (
                        <button
                            onClick={() => setShowConfig(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Backend Server URL
                        </label>
                        <input
                            type="text"
                            value={backendUrl}
                            onChange={(e) => setBackendUrl(e.target.value)}
                            placeholder={getLocalIP()}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                        <p className="mt-2 text-sm text-gray-600">
                            Enter your backend server URL (include http:// or https://)
                        </p>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-blue-800">
                            Make sure your device is on the same network as the backend server
                        </p>
                    </div>

                    {isConnected !== null && !isLoading && (
                        <div className={`flex items-center gap-2 p-3 rounded-lg ${isConnected ? 'bg-green-50' : 'bg-red-50'
                            }`}>
                            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'
                                }`} />
                            <p className={`text-sm font-medium ${isConnected ? 'text-green-800' : 'text-red-800'
                                }`}>
                                {isConnected ? 'Connected to backend server' : 'Cannot connect to backend server'}
                            </p>
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={handleSave}
                            disabled={isLoading || !backendUrl}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Testing...
                                </span>
                            ) : (
                                'Save & Connect'
                            )}
                        </button>
                        <button
                            onClick={() => checkConnection(backendUrl)}
                            disabled={isLoading || !backendUrl}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            Test Connection
                        </button>
                    </div>

                    <div className="pt-4 border-t">
                        <h3 className="font-medium text-gray-900 mb-2">How to find your backend URL:</h3>
                        <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                            <li>Run your backend server on your computer</li>
                            <li>Find your computer&rsquo;s local IP address</li>
                            <li>Use format: http://[IP-ADDRESS]:[PORT]/api</li>
                            <li>Example: http://192.168.1.100:3001/api</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}