/** *****************************************************
 * Main Application
 * Exported function returns an instantiated Express
 * Application with middleware providing:
 * - Static File Routing
 * - Router - This provides a separate avenue for API / HTML response handlers
 ***************************************************** */
import express from 'express';
import { join as joinPath } from 'path';
import PythonShell from 'python-shell';
import serverRouter from './server-router';


// we'll create our routes here

// get an instance of router
const router = express.Router();

// home page route (http://localhost:8080)
router.get('/plugs/2/on', function(req, res) {
  PythonShell.run('./pythonScripts/plug2On.py', function (err) {
    if (err) throw err;
    res.send('I turned the plug on!');
  });
});

// about page route (http://localhost:8080/about)
router.get('/plugs/2/off', function(req, res) {
  PythonShell.run('./pythonScripts/plug2Off.py', function (err) {
    if (err) throw err;
    res.send('I turned the plug off!');
  });
});

export default () => express()
  .use(express.static(joinPath(__dirname, 'public')))
  .use('/', router)
  .use(serverRouter());

