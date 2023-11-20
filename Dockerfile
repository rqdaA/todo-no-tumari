FROM ubuntu:23.04
RUN apt update && apt upgrade -y && apt install -y git neovim python3 python3-pip python3-venv sudo curl wget unzip make gcc build-essential
RUN id ubuntu && userdel ubuntu || true # ubuntuというユーザがいたら削除
RUN groupadd user -g 1001 && useradd -m user -s /bin/bash -u 1000 -g 1001 -G sudo
RUN echo user:password | chpasswd
RUN echo "user ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
RUN apt install -y npm

USER user
WORKDIR /app
# RUN curl -fsSL https://bun.sh/install | bash
RUN touch .sudo_as_admin_successful

# keep running
ENTRYPOINT ["npm", "start"]
