#!/usr/bin/env bash

# MIT License

# Copyright (c) 2018 Olivier Tille

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

set -e

# define what Node.js version you want use
NPM_FOLDER="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null 2>&1 && cd .. && pwd )/.npm"
NODE_VERSION='v10.16.0'

platform='unknown'
unamestr=`uname`

if [[ "$unamestr" == 'Linux' ]]; then
  platform='linux-x64'
elif [[ "$unamestr" == 'Darwin' ]]; then
  platform='darwin-x64'
else
  echo 'Sorry, your platform is not supported'
  exit 1
fi

if [[ ! -d "$NPM_FOLDER" ]]; then
  mkdir $NPM_FOLDER
fi

nodestr="node-${NODE_VERSION}-${platform}"

if [[ ! -f "$NPM_FOLDER/${nodestr}.tar.gz" ]]; then
  url="https://nodejs.org/dist/${NODE_VERSION}/${nodestr}.tar.gz"
  echo "Downloading ${nodestr}"
  wget -q -P $NPM_FOLDER ${url}
fi

if [[ ! -d "$NPM_FOLDER/${nodestr}" ]]; then
  echo "Unpacking ${nodestr}.tar.gz"
  tar xf $NPM_FOLDER/${nodestr}.tar.gz -C $NPM_FOLDER/
fi

$NPM_FOLDER/${nodestr}/bin/node $NPM_FOLDER/${nodestr}/bin/npm --scripts-prepend-node-path true "$@"