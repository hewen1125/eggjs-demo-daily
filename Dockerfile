FROM centos:7
RUN curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.163.com/.help/CentOS7-Base-163.repo
RUN yum install epel-release -y && yum clean all
RUN yum install nodejs -y && yum clean all

COPY . /app/
WORKDIR /app/
VOLUME /app/

RUN npm config set registry https://registry.npm.taobao.org/
RUN npm install
EXPOSE 7001
CMD npm run dev
