# 의존성 주입(DI, Dependency Injection)

*이 글은 개발자가 반드시 정복해야할 객체지향과 디자인 패턴(인투북스 최범균)* 일부를 발췌하여 작성했다.

### 정의

객체를 사용할 때 직접 생성하여 사용하지 않고, 클래스를 생성할 때 사용할 객체를 전달받아 사용하는 방법.

> 필요한 객체를 직접 생성하거나 찾지 않고 외부에서 넣어 주는 방식이다.



### 설명

보통 클래스내에서 객체를 생성하여 사용할 때 new 연산자를 사용해 객체를 생성하여 사용하게 된다.

```java
public interface JobQueue { }

public class FileJobQueue implement JobQueue { }

public class HttpJobQueue implement JobQueue { }

public class Worker {
  public void run() {
    // 직접 콘크리트 클래스를 사용
    JobQueue jobQueue = new FileJobQueue();
  }
}
```

위 처럼 인터페이스를 구현한 클래스(콘크리트 클래스)를 직접사용하게 되면, JobQueue를 구현한 다른방식의 구현클래스 HttpJobQueue를 사용해야될 필요가 있을 때 **직접 Worker 클래스를 수정해서 FileJobQueue를 생성하는 부분을 수정해서 HttpJobQueue로 변경**해야 한다.

따라서, 변화에 경직된 유연하지 못한 코드를 만들게 된다.



DI를 적용하는 방식에는 두가지가 있다.

- 생성자 방식
- 설정 메서드 방식



생성자 방식은 객체를 생성할 때 생성자를 통해서 의존 객체를 전달받는 방식이다.

```java
public class JobCLI {
  private JobQueue jobQueue;
  
  //생성자를 통해서 의존 객체를 전달 받음
  public JobCLI(JobQueue jobQueue) {
    this.jobQueue = jobQueue;
  }
  
  public void interact() {
    ...
    this.jobQueue.addJob(jobData);
    ...
  }
}
```

 

설정 메서드 방식은 설정메소드(Setter)를 통해서 의존 객체를 전달받는 방식이다.

```java
public class Worker {
  private JobQueue jobQueue;
  private Transcoder transcoder;
  
  public void setJobQueue(JobQueue jobQueue) {
    this.jobQueue = jobQueue;
  }
  public void setTranscoder(Transcoder transcoder) {
    this.transcoder = transcoder;
  }
  
  public void runs() {
    while(someRunningCondition) {
      JobData jobData = jobQueue.getJob();
      transcoder.transcode(jobData.getSource(), jobData.getTarget());
    }
  }
}
```

**setJobQueue() 메서드와 setTranscoder() 메서드는 파라미터로 전달받은 의존 객체를 필드에 보관하며, 다른 메서드에서는 필드를 사용해서 의존 객체의 기능을 실행한다.** 위에서는 각각 setXXX()형태로 작성했지만, 어떤형식으로 작성해도 파라미터를 통해 의존객체를 전달받아 필드에 보관하게 하면 된다.