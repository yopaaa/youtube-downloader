import download from "download";
import y2mate from "y2mate-api";
import "dotenv/config";
import fs from "fs";
import readline from "readline";
import ora from "ora";

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const __dirname = process.env.PWD;

console.log("please insert correct youtube video");

prompt.question("Download link = ", (link) => {
  y2mate.GetVideo(link).then((data) => {
    const name = data.title.replaceAll(" ", "-").slice(0, 30);

    try {
      console.log(`downloading video : ${name}...`);

      const downloadingFn = async () => {
        const processDownloading = ora("Downloading please wait...").start();
        fs.writeFileSync(
            `${__dirname}/result/${name}.mp4`,
            await download(data.urlDown, { rejectUnauthorized: false })
        );

        processDownloading.stopAndPersist({
          symbol: "✅",
          text: `All done video saved in ./result/${name}.mp4`,
        });
      };

      downloadingFn();
    } catch (error) {
      console.log(error);
    }
  });
  prompt.close();
});
