FROM jupyterhub/jupyterhub:latest

COPY jupyterhub_config.py /srv/jupyterhub/jupyterhub_config.py
RUN useradd -ms /bin/bash jtheaton
RUN echo jtheaton:access123 | chpasswd
RUN chown jtheaton /home/jtheaton
RUN conda install scipy
RUN pip install notebook
RUN pip install sklearn
RUN pip install pandas
RUN pip install pandas-datareader
RUN pip install matplotlib
RUN pip install pillow
RUN pip install requests
RUN pip install h5py
RUN pip install gensim
RUN pip install tensorflow==1.3.0
RUN pip install keras==2.0.8
EXPOSE 80
