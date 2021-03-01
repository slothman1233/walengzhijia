var work = "work/",

    styles_dev = work + "page",
    styles_dist = "dist/styles",


    scripts_dev = work + "page",
    scripts_dist = "dist/scripts",

    public_scripts_dev = work + "/public/script",
    public_scripts_dist = "dist/public/script",

    public_less_dev = work + "public/style",
    public_less_dist = "dist/public/style";


module.exports = {
    root: styles_dev,
    publicRoot: work + "public",
    js: { //用于压缩
        dev: scripts_dev + "/**/*.ts",
        dist: scripts_dist,

    },

    less: {
        dev: styles_dev + "/**/*.less",
        dist: styles_dist

    },

    public: {
        script_dev: public_scripts_dev + "/index.ts",
        script_dist: public_scripts_dist,

        less_dev: public_less_dev + "/index.less",
        less_dist: public_less_dist
    },

    clean: {
        dist: "dist/**/*",
        // noClean: "!style/dist/**/!(Public)*"
    },


}

