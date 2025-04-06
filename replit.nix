{ pkgs }: {
  deps = [
    pkgs.ocamlPackages.ffmpeg-avutil
    pkgs.python312Packages.ha-ffmpeg
    pkgs.perl536Packages.ImageMagick
    pkgs.bashInteractive
    pkgs.nodePackages.bash-language-server
    pkgs.man
  ];
}