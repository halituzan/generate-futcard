import multer from 'multer';

const { removeBackground } = require('@imgly/background-removal-node');

const upload = multer({ storage: multer.memoryStorage() });

const handler = async (req, res) => {

    const { file } = req.body

    await new Promise((resolve, reject) => {
        upload.single('img')(req, res, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });


    const baseUrl = "http://localhost:3000/"

    const upload = multer({
        storage: multer.diskStorage({
            destination: './public/uploads',
            filename: (req, file, cb) => cb(null, file.originalname),
        }),
    });

    try {
        const blob = await removeBackground(baseUrl + "/" + file);
        const buffer = Buffer.from(await blob.arrayBuffer());
        const dataURL = `data:image/png;base64,${buffer.toString("base64")}`;
        res.json({ data: dataURL })
    } catch (error) {
        console.log(error);

    }

};

export default handler;
