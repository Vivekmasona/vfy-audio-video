import express from 'express';
const app = express();
import cors from 'cors';
import path from 'path';
const __dirname = path.resolve();

const port = process.env.PORT || 4000;
app.use(express.static(path.join(__dirname, '/files')));
app.use(cors());

function customHeaders(req, res, next) {
    app.disable('x-powered-by');
    res.setHeader('X-Powered-By', 'Video Downloader');
    next();
}
app.use(customHeaders);

app.get('/robots.txt', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/robots.txt'));
});

import home from './routes/home.js';
import audio from './routes/audio.js';
import video from './routes/video.js';

app.use('/', home);
app.use('/audio/:audio', audio);
app.use('/video/:video', video);

app.use('/', function(req, res) {
    res.status(404).json({
        error: 1,
        message: 'Data not Found'
    });

app.get("/hack", async (req, res) => {
  const url = req.query.url;
  console.log(url);
  const info = await ytdl.getInfo(url);
  const title = info.videoDetails.title;
  const thumbnail = info.videoDetails.thumbnails[0].url;
  let formats = info.formats;

  const audioFormats = ytdl.filterFormats(info.formats, "audioonly");
  // const format = ytdl.chooseFormat(info.formats, { quality: "249" });
  formats = formats.filter((format) => format.hasAudio === true);

  res.send({ title, thumbnail, audioFormats, formats });
});

})

app.listen(port, function() {
    console.log('listening on port ' + port);
});
