Vagrant.configure(2) do |config|
    config.vm.box = "ubuntu/trusty64"
    config.vm.synced_folder ".", "/vagrant"
    config.vm.provision :shell, path: "provision.sh"
    config.vm.network :forwarded_port, guest: 3000, host: 3000

    config.vm.provider :virtualbox do |v|
      v.customize [
        "modifyvm", :id,
        "--cpus", 4
      ]

      v.customize [
        "modifyvm", :id,
        "--memory", 2048
      ]

      v.customize [
        "modifyvm", :id,
        "--name", "simple-todos-tutorial"
      ]
    end
end
