package cn.itcast.graphql;

import java.io.File;

public class NNIT {

    public static void main(String[] args) {

        String path="c:/";
        getFileNum(path);

    }

    public static int getFileNum(String path) {
        File pathfile = new File(path);
        while (pathfile.isDirectory()) {
            File[] filelist = pathfile.listFiles();
            for(File f : filelist) {

            }
        }
        return 0;
    }

}
