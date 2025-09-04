/*
SYSTEM LEVER CMDS

uname -> tells about the platform on which your linux running on
Linux 
uptime -> return the detail infor about system working time and how many users are active on now
 21:59:07 up  5:25,  0 user,  load average: 0.01, 0.07, 0.08
 whoami -> who is logged in now | tells only user name
 which programm.name -> tells the versioning details of that programm
 
✅ 1. File Management in Linux

Linux File System Structure

/ → Root directory (top of the file system)
/home → User home directories
/bin → Essential binaries (commands)
/etc → Configuration files
/var → Logs and variable data
/tmp → Temporary files
/usr → User programs and data
Basic File Commands
ls → List files and directories
ls -l (detailed view), ls -a (show hidden)
pwd → Show current directory
cd [directory] → Change directory
mkdir [dir] → Create directory
rmdir [dir] → Remove empty directory
rm [file] → Remove file
rm -r [dir] → Remove directory with files
cp [src] [dest] → Copy file
cp -r → Copy directory
mv [src] [dest] → Move or rename file
touch [file] → Create empty file
cat [file] → View file content
head -n 10 [file] → First 10 lines
tail -n 10 [file] → Last 10 lines
✅ 2. User Management in Linux
User Accounts
Root user → Superuser (full access)
Normal user → Limited privileges
Important Files
/etc/passwd → Stores user info
/etc/shadow → Stores encrypted passwords
/etc/group → Stores group info
User Management Commands
whoami → Show current user
id → Show user ID and groups
adduser [username] or useradd [username] → Add user
passwd [username] → Set/change password
deluser [username] or userdel [username] → Delete user
groupadd [groupname] → Add group
usermod -aG [group] [user] → Add user to group
who or w → Show logged-in users
✅ 3. File Permissions in Linux
Types of Permissions
r → Read (4)
w → Write (2)
x → Execute (1)
Permission Levels
Owner (u) → File creator
Group (g) → Users in file’s group
Others (o) → All other users
View Permissions
ls -l
Example: -rw-r--r--
- → File, d → Directory
Owner: rw- (read, write)
Group: r-- (read)
Others: r-- (read)

Change Permissions
chmod → Change file permissions
Symbolic:
chmod u+x file → Add execute for owner
chmod g-w file → Remove write for group
Numeric:
chmod 755 file
Owner: 7 (rwx)
Group: 5 (r-x)
Others: 5 (r-x)
chown [owner]:[group] file → Change owner/group
chgrp [group] file → Change group

Got it 👍 I’ll make **simple notes** for you with **Linux commands, short explanations, and easy examples with outputs**.

---

# 📒 Linux File Transfer & Permissions – Simple Notes

## 🔹 1. **SCP (Secure Copy)**

Used to securely copy files between **local ↔ remote servers** using SSH.

**Syntax:**

```bash
scp source_file user@remote:/path
scp user@remote:/path/file /local/path
```

**Example:**

```bash
scp notes.txt yash@192.168.1.5:/home/yash/
```

📤 Copies `notes.txt` from local machine to remote server.

**Output:**

```
notes.txt                                100%  120KB  1.2MB/s   00:01
```

---

## 🔹 2. **rsync**

Efficient file copy & sync tool (better than `scp`).

**Syntax:**

```bash
rsync [options] source destination
```

**Example:**

```bash
rsync -av notes/ yash@192.168.1.5:/home/yash/notes_backup/
```

📂 Copies folder `notes/` to remote server while preserving permissions.

**Output:**

```
sending incremental file list
file1.txt
file2.txt
sent 2,345 bytes  received 120 bytes  4,930.00 bytes/sec
```

---

## 🔹 3. **Compress / Decompress Files**

### tar (archive + compress)

```bash
tar -cvf files.tar file1 file2   # create archive
tar -xvf files.tar               # extract
tar -czvf files.tar.gz folder/   # compress with gzip
tar -xzvf files.tar.gz           # extract .tar.gz
```

**Example:**

```bash
tar -czvf backup.tar.gz myfolder/
```

**Output:**

```
myfolder/
myfolder/file1.txt
myfolder/file2.txt
```

---

## 🔹 4. **zip / unzip**

Alternative to `tar`.

```bash
zip archive.zip file1 file2      # compress
unzip archive.zip                # extract
```

**Example:**

```bash
zip notes.zip file1.txt file2.txt
```

**Output:**

```
  adding: file1.txt (deflated 60%)
  adding: file2.txt (deflated 50%)
```

---

## 🔹 5. **File Permissions**

Linux permissions:

* **r (4)** → read
* **w (2)** → write
* **x (1)** → execute

**Check permissions:**

```bash
ls -l
```

**Output:**

```
-rw-r--r--  1 yash yash  120 Sep  4 20:00 file.txt
```

---

## 🔹 6. **chmod (Change Mode – permissions)**

```bash
chmod 755 file.sh   # rwxr-xr-x
chmod u+x file.sh   # add execute to user
chmod g-w file.txt  # remove write for group
```

**Example:**

```bash
chmod 744 script.sh
```

**Output (ls -l):**

```
-rwxr--r--  1 yash yash  300 Sep  4 20:10 script.sh
```

---

## 🔹 7. **chown (Change Owner)**

```bash
chown newuser file
chown newuser:newgroup file
```

**Example:**

```bash
sudo chown root file.txt
```

**Output:**

```
-rw-r--r--  1 root yash  120 Sep  4 20:15 file.txt
```

---

## 🔹 8. **chgrp (Change Group)**

```bash
chgrp developers file
```

**Example:**

```bash
sudo chgrp staff file.txt
```

**Output:**

```
-rw-r--r--  1 yash staff  120 Sep  4 20:20 file.txt
```

---

## 🔹 9. **Common File Transfer Commands Recap**

| Command     | Use                                    |
| ----------- | -------------------------------------- |
| `scp`       | Copy files securely over SSH           |
| `rsync`     | Sync/copy efficiently (resume, mirror) |
| `tar`       | Archive + compress/extract             |
| `zip/unzip` | Compress/extract files                 |
| `chmod`     | Change file permissions                |
| `chown`     | Change file owner                      |
| `chgrp`     | Change group ownership                 |

---

👉 Would you like me to also make a **one-page PDF cheat sheet** with these commands + examples (so you can keep it handy while practicing)?

*/