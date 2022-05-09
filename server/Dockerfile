FROM library/node:16.15.0

ENV PATH="/root/miniconda3/bin:$PATH"
ARG PATH="/root/miniconda3/bin:$PATH"
RUN apt-get update

RUN apt-get install -y wget && rm -rf /var/lib/apt/lists/*

RUN wget \
    https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh \
    && mkdir /root/.conda \
    && bash Miniconda3-latest-Linux-x86_64.sh -b \
    && rm -f Miniconda3-latest-Linux-x86_64.sh 
RUN conda --version

RUN conda install -c conda-forge librosa
RUN conda install tensorflow
RUN pip3 install yt_dlp

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "server"]