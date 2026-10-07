# Hướng dẫn chạy với Podman

## 1. Build image

```bash
podman build -t smtp-mail-client -f Containerfile .
```

## 2. Chạy bằng Podman Compose

Tạo file `.env` ở root project với các biến sau:

```env
PRIVATE_KEY=your_private_key_here
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_here
```

Sau đó chạy:

```bash
podman-compose -f podman-compose.yml up -d --build
```

Hoặc nếu hệ thống dùng `podman compose`:

```bash
podman compose -f podman-compose.yml up -d --build
```

## 3. Kiểm tra service

```bash
podman ps
```

Ứng dụng sẽ chạy ở:

```text
http://localhost:8080
```

MongoDB: `mongodb://localhost:27017`
Redis: `redis://localhost:6379`

## 4. Xem log

```bash
podman logs -f smtp-mail-client
```

## 5. Dừng service

```bash
podman-compose -f podman-compose.yml down
```

Hoặc:

```bash
podman compose -f podman-compose.yml down
```

## 6. Ghi chú

- App đọc biến môi trường `MONGO_DB`, `REDIS_URL`, `PORT`, `PRIVATE_KEY`, `SMTP_USER`, `SMTP_PASS`.
- Nếu cần chạy trên môi trường thật, hãy thay `PRIVATE_KEY` và SMTP credentials phù hợp.
- Nếu app không kết nối được Redis/Mongo, kiểm tra log của `smtp-mail-client`, `smtp-mail-client-mongo`, `smtp-mail-client-redis`.
