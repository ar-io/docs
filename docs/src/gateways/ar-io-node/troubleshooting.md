---
permalink: "/troubleshooting"
---

# Troubleshooting

## My Gateway Seems to be Running but...

###

<details>
<summary><strong>My release number doesn't match the latest version, or includes "-pre"</strong></summary>

If your release number when you go to `<your-gateway>/ar-io/info` is lower than the current release, you simply need to upgrade your gateway in order to reach the latest release. 

If your release number includes the suffix "-pre" it means you are running your gateway from the development branch of the github repository, instead of the main branch. The development branch is used for staging work that the engineering team is in the middle of. Because of this, it can be much less stable than the main branch used for production and can cause significant issues. 

Ensure that you are running the latest release, from the main branch, by running the below commands in your terminal:

```console
sudo docker-compose down --rmi all

git checkout main

git pull

sudo docker-compose up -d
```

If this doesn't resolve the issue, you can also try a more extreme method of clearing out the incorrect docker images:

```console
sudo docker-compose down

sudo docker system prune -a

sudo docker-compose up -d
```

</details>

###

<details>
<summary><strong>It appears offline on <a target="_blank" href="https://viewblock.io/arweave/gateways">Viewblock</a> or <a target="_blank" href="https://gateways.arweave.dev">ar://gateways</a></strong></summary>

Viewblock and ar://gateways use a very simple ping method for determining if a gateway is "up". There are plenty of reasons why this ping may fail while the gateway is running perfectly, so showing as down is not cause for concern. Just verify that your gateway is still running, and wait. Your gateway will show as up again soon.

</details>

###

<details>
<summary><strong>< gateway >/ar-io/observer/reports/current just says "report pending"</strong></summary>

This is normal. Your Observer is working to generate a report and that report will be displayed once it is complete.

</details>

###

<details>
<summary><strong>My Observer is showing me the error "error: Error reading interaction: Cannot read properties of undefined"</strong></summary>

This is not an issue with your observer. The short explanation is that your Observer is looking for tasks assigned to it by the ar.io network contract, but there isnt anything there. You can safely ignore this error message.

</details>

###

<details>
<summary><strong>Observing my gateway shows failures</strong></summary>

When observing a gateway, there are two main pass/fail tests. "Ownership" and "ArNS Assessment"

- Ownership: This tests to see if the value set in your gateway `AR_IO_WALLET` value (in .env) matches the wallet used to join the AR.IO Network. If they don't match, update the value in your .env file and restart your gateway.

- ArNS Assessment: This tests to see if a gateway is able to resolve ArNS names correctly. The first thing you should check is if you have the `ARNS_ROOT_HOST` value set in your .env file. If not, set the value and restart your gateway. If this value is set, check to make sure you have current DNS records and SSL certificates for wildcard subdomains on your gateway.

</details>

###

<details>
<summary><strong>I updated my .env settings, but nothing changed on my gateway</strong></summary>

Once you edit your .env file, you need to "rebuild" your gateway for the changes to take effect. As of release 3, every time you start your gateway with `docker-compose` it is automatically rebuilt. So all you need to do is shut your gateway down and restart it.

</details>

###

<details>
<summary><strong>I am geting an out of disk space error, but I still have open storage space on my computer</strong></summary>

The most likely cause of this is inode exhaustion. Test this by running the command:

```
df -i
```

If one of the lines in the output says 100%, you have run out of inodes and so your filesystem is not capable of creating new files, even if you have available space. The solution is to delete files from your `data` folder in order to free up inodes.

This was a common issue prior to release #3, when Redis caching was introduced to reduce the number of small files created. If you are using an older version of the gateway, consider upgrading to mitigate the risk of inode exhaustion.

</details>

###

<details>
<summary><strong>I can't load ArNS names</strong></summary>

The first thing you should check if your gateway is not resolving ArNS names is that you have `ARNS_ROOT_HOST` set in your .env file. If not, set it to your domain name used for the gateway. For example, `ARNS_ROOT_HOST=arweave.dev`.

Once this value is set, restart your gateway for the changes to take effect.

If that doesn't resolve the issue, check your dns records. You need to have a wildcard subdomain ( \*.< your-domain > ) set with your domain registrar so that ArNS names will actually point at your gateway. You can set this record, and generate an SSL certificate for it, in the same way you set the records for your primary domain.

</details>

</br>

## My Gateway was Running, but now it isn't

###

<details>
<summary><strong>When I try to access my gateway in a browser I get a "Your connection is not private" error</strong></summary>

This error message means that your SSL certificates have expired. You need to renew your certificates by running the same certbot command you used when you initially started your gateway:

```
sudo certbot certonly --manual --preferred-challenges dns --email <your-email-address> -d <your-domain>.com -d '*.<your-domain>.com'
```

Certbot SSL certificates expire after 90 days, and you will need to rerun this command to renew every time. If you provide an email address, you will receive an email letting you know when it is time to renew.

</details>

</br>

## I am having Trouble Getting my Gateway Set up

</br>

###

<details>
<summary><strong>I set my gateway up, but when I go to my domain I get a 404/Nginx error</strong></summary>

If you navigate to your domain and see a 404 error from Nginx (the reverse proxy server used in the setup guide) it means that your domain is correctly pointed at the machine running your gateway, but you have not properly configured your Nginx settings (or your gateway is not running).

The [Set up Networking](./linux-setup.md#set-up-networking) section of the setup guide has detailed instructions on configuring your Nginx server. If all else fails, try restarting Nginx, that usually clears any issues with the server clinging to old configurations.

```
sudo service nginx restart
```

</details>

###

<details>
<summary>When I visit my domain I see a 502 error from Nginx</summary>

A 502 error from Nginx means that Nginx is working correctly, but it is receiving an error from your gateway when it tries to forward traffic.

</details>

###

<details>
<summary><strong>I am having trouble generating my SSL certificates</strong></summary>

When using the manual certbot command provided in the setup guide:

```
sudo certbot certonly --manual --preferred-challenges dns --email <your-email-address> -d <your-domain>.com -d '*.<your-domain>.com'
```

You need to be sure that you are waiting after creating your TXT records for them to completely propagate. You can check propagation using a tool like [dnschecker.org](https://dnschecker.org).

If you continue to have issues, you can check the [official certbot instructions guide](https://certbot.eff.org/instructions).

</details>

</br>

If you do not see your issue listed here, or if you were not able to solve your problem with the above information, feel free to reach out in the ar.io discord.

## Quick Lookup

Below is a quick summary of what you should check when troubleshooting your gateway. Find more detailed information in the sections above.

<div style="text-align: center">
<table class="inline-table" style="text-align: left">
    <tr style="text-align: center">
        <th>Issue</th>
        <th>What to Check</th>
    </tr>
    <tr>
        <td>My release number is wrong</td>
        <td>Pull the latest github updates and make sure you are on the <code>main</code> branch</td>
    </tr>
    <tr>
        <td>Gateway appears offline on Viewblock or ar://gateways</td>
        <td>Probably fine, but verify that your gateway is still running.</td>
    </tr>
    <tr>
        <td>'/ar-io/observer/reports/current' just says "report pending"</td>
        <td>Normal behavior, wait for the report to complete.</td>
    </tr>
    <tr>
        <td>Observer error "Cannot read properties of undefined"</td>
        <td>Normal behavior, Observer is checking for data not implemented yet.</td>
    </tr>
    <tr>
        <td>Observing my gateway shows failures</td>
        <td>Check <code>AR_IO_WALLET</code> and <code>ARNS_ROOT_HOST</code> settings.</td>
    </tr>
    <tr>
        <td>Updated .env settings not reflected on gateway</td>
        <td>Rebuild your gateway after editing .env file.</td>
    </tr>
    <tr>
        <td>Out of disk space error</td>
        <td>Check for inode exhaustion and delete files if necessary.</td>
    </tr>
    <tr>
        <td>Can't load ArNS names</td>
        <td>Check <code>ARNS_ROOT_HOST</code> setting in .env file, and DNS records.</td>
    </tr>
    <tr>
        <td>"Your connection is not private" error</td>
        <td>Generate or renew SSL certificates.</td>
    </tr>
    <tr>
        <td>404/Nginx error when accessing domain</td>
        <td>Check Nginx settings and restart Nginx if necessary.</td>
    </tr>
    <tr>
        <td>502 error from Nginx</td>
        <td>Check for errors in your gateway.</td>
    </tr>
    <tr>
        <td>Trouble generating SSL certificates</td>
        <td>Ensure TXT records have propagated and follow certbot instructions.</td>
    </tr>
</table>
</div>
