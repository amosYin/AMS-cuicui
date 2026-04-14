/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';

export default function App() {
  return (
    <div className="flex h-screen bg-ams-bg overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
