branch=dev

server-deploy:
	git push heroku `git subtree split --prefix server ${branch}`:main --force
