#!/bin/bash -e

opts=$(getopt \
    --long "build,daemon,production" \
    --name "$(basename "$0")" \
    --options "" \
    -- "$@"
)

eval set --$opts

while [[ $# -gt 0 ]]; do
    case "$1" in
        --build)
            build='SET'
            shift
            ;;

        --production)
            production='SET'
            shift
            ;;
        
        --daemon)
            daemon='SET'
            shift
            ;;

        *)
            break
            ;;
    esac
done

comand=""
command+="docker-compose "

command+="-f packages/restaurant.mobile/docker-compose.yml "
command+="up "

if [[ ! -z "$build" ]]; then
    command+="--build "
fi

if [[ ! -z "$daemon" ]]; then
    command+="-d "
fi

if [[ ! -z "$production" ]]; then
    command+="restaurant.mobile--production "
else
    command+="restaurant.mobile--development "
fi

set -x
eval $command
