#!/bin/bash

# Abrir MongoDB Compass e Insomnia
mongodb-compass &
insomnia &

# Abrir una nueva terminal y ejecutar el primer comando
# terminator --tab --working-directory="/home/luquez/ReactJs-Learning/vite-project-03" --hold --title="ReactJs Learning" --command="npm run dev"
# terminator --working-directory="/home/luquez/ReactJs-Learning/vite-project-03" --title="ReactJs Learning" -x npm run dev
 # terminator --title="My Terminals" \
 # --working-directory="/home/luquez/ReactJs-Learning/vite-project-03" -x "npm run dev" ; \
# alacritty --title="API Rest Node" \
# --working-directory="/home/jose/ReactJs-Learning-original/victor-robles/api-rest-node-jose" -e "npm start"

alacritty --title "API Rest Node" \
--working-directory /home/jose/ReactJs-Learning-original/victor-robles/blog/api-rest-node-blog -e npm start


# Abrir una segunda terminal y ejecutar el segundo comando
